import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as rds from "aws-cdk-lib/aws-rds";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class C95Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 1,
      natGateways: 0,
      subnetConfiguration: [
        { name: "Public", subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        {
          name: "Database",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    const dbSecret = new secretsmanager.Secret(this, "DbSecret", {
      secretName: "c95/database",
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: "c95" }),
        generateStringKey: "password",
        excludePunctuation: true,
      },
    });

    new secretsmanager.Secret(this, "AppSecret", {
      secretName: "c95/app",
      description:
        "After deploy: set AUTH_SECRET, NEXTAUTH_URL, RESEND_API_KEY, BASE_PATH as JSON keys",
    });

    const uploadsBucket = new s3.Bucket(this, "Uploads", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const appSg = new ec2.SecurityGroup(this, "AppSg", {
      vpc,
      description: "C95 Next.js (PM2)",
      allowAllOutbound: true,
    });

    const dbSg = new ec2.SecurityGroup(this, "DbSg", {
      vpc,
      description: "RDS PostgreSQL",
      allowAllOutbound: false,
    });

    dbSg.addIngressRule(appSg, ec2.Port.tcp(5432), "PostgreSQL from app tier");

    const database = new rds.DatabaseInstance(this, "Postgres", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [dbSg],
      credentials: rds.Credentials.fromSecret(dbSecret),
      databaseName: "c95",
      allocatedStorage: 20,
      storageEncrypted: true,
      publiclyAccessible: false,
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false,
      removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
    });

    const role = new iam.Role(this, "Ec2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      description: "C95 EC2 — Secrets Manager + S3 uploads",
    });
    dbSecret.grantRead(role);
    uploadsBucket.grantReadWrite(role);
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"],
        resources: [
          `arn:${cdk.Aws.PARTITION}:secretsmanager:${this.region}:${this.account}:secret:c95/*`,
        ],
      }),
    );

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "set -euxo pipefail",
      "dnf update -y",
      "dnf install -y git rsync",
      "mkdir -p /home/ec2-user/node22",
      "curl -fsSL https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-arm64.tar.xz | tar -xJ -C /home/ec2-user/node22 --strip-components=1",
      "chown -R ec2-user:ec2-user /home/ec2-user/node22",
      "npm install -g pm2",
      "mkdir -p /home/ec2-user/c95",
      "chown ec2-user:ec2-user /home/ec2-user/c95",
      "echo 'Bootstrap complete. Sync app with scripts/deploy-c95.sh and configure .env on the server.'",
    );

    const instance = new ec2.Instance(this, "AppHost", {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.SMALL),
      machineImage: ec2.MachineImage.latestAmazonLinux2023({
        cpuType: ec2.AmazonLinuxCpuType.ARM_64,
      }),
      securityGroup: appSg,
      role,
      userData,
      ssmSessionPermissions: true,
    });

    appSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "SSH — restrict to your IP in production");
    appSg.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(3000),
      "Next.js — put ALB/reverse proxy in front for HTTPS",
    );

    new cdk.CfnOutput(this, "Ec2PublicIp", {
      value: instance.instancePublicIp,
      description: "Deploy target for scripts/deploy-c95.sh (ec2-user@this-ip)",
    });

    new cdk.CfnOutput(this, "RdsEndpoint", {
      value: database.instanceEndpoint.socketAddress,
      description: "DATABASE_URL host (use secret c95/database for password)",
    });

    new cdk.CfnOutput(this, "UploadsBucketName", {
      value: uploadsBucket.bucketName,
    });

    new cdk.CfnOutput(this, "DbSecretArn", {
      value: dbSecret.secretArn,
    });

    new cdk.CfnOutput(this, "DeployHint", {
      value: `C95_SSH=ec2-user@${instance.instancePublicIp} C95_REMOTE_DIR=/home/ec2-user/c95 ./scripts/deploy-c95.sh`,
    });
  }
}
