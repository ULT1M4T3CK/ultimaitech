#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { C95Stack } from "../lib/c95-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? "eu-west-1",
};

new C95Stack(app, "C95Dev", {
  env,
  description: "C95 Next.js app — dev-sized EC2 + RDS PostgreSQL + S3 uploads",
});
