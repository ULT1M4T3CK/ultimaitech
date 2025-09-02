import pool from './config';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  try {
    console.log('Setting up database...');

    // Create projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_path VARCHAR(500),
        technologies TEXT[],
        project_url VARCHAR(500),
        github_url VARCHAR(500),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin_users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create visitor_stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitor_stats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        ip_address VARCHAR(45),
        user_agent TEXT,
        page_visited VARCHAR(255),
        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin user if it doesn't exist
    const adminUsername = process.env.ADMIN_USERNAME || 'andre568';
    const adminPassword = process.env.ADMIN_PASSWORD || 'UltimateX180@';
    
    const existingAdmin = await pool.query(
      'SELECT id FROM admin_users WHERE username = $1',
      [adminUsername]
    );

    if (existingAdmin.rows.length === 0) {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await pool.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
        [adminUsername, passwordHash]
      );
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Insert sample projects
    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform built with React and Node.js, featuring user authentication, product management, and payment integration.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        featured: true
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
        technologies: ['Vue.js', 'Express', 'Socket.io', 'MongoDB'],
        featured: true
      },
      {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing creative work and professional experience.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        featured: false
      }
    ];

    for (const project of sampleProjects) {
      const existingProject = await pool.query(
        'SELECT id FROM projects WHERE title = $1',
        [project.title]
      );

      if (existingProject.rows.length === 0) {
        await pool.query(
          'INSERT INTO projects (title, description, technologies, featured) VALUES ($1, $2, $3, $4)',
          [project.title, project.description, project.technologies, project.featured]
        );
      }
    }

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();
