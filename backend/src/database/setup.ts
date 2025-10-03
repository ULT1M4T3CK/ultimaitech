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

    // Insert real projects
    const realProjects = [
      {
        title: 'TimeEX - Time Tracking Platform',
        description: 'Comprehensive time tracking application with dashboard, reporting, and project management features. Built with modern web technologies for efficient work hour tracking and earnings calculation.',
        image_path: '/images/Projects/timex-logo.png',
        technologies: ['React', 'JavaScript', 'CSS3', 'Local Storage', 'Chart.js', 'Responsive Design'],
        project_url: 'https://ult1m4t3ck.github.io/TimeEx/',
        github_url: 'https://github.com/ULT1M4T3CK/TimeEx',
        featured: true
      },
      {
        title: 'Nijenhuis Botenverhuur - Boat Rental Platform',
        description: 'Professional boat rental website for Nijenhuis in the Weerribben nature area. Features online booking system, availability checking, and comprehensive service information for boat rentals and camping.',
        image_path: '/images/Projects/Nijenghuis-logo.svg',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Booking System', 'Multi-language'],
        project_url: 'https://ult1m4t3ck.github.io/Nijenhuis/pages/index.html',
        github_url: 'https://github.com/ULT1M4T3CK/Nijenhuis',
        featured: true
      },
      {
        title: 'MareSphere - Maritime Consulting',
        description: 'Professional maritime consulting website showcasing comprehensive marine operations, safety, and sustainable practices. Features contact forms, service modules, and professional maritime expertise presentation.',
        image_path: '/images/Projects/Maresphere-logo.png',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Professional Design', 'Contact Forms', 'Service Modules'],
        project_url: 'https://ult1m4t3ck.github.io/MareSphere/',
        github_url: 'https://github.com/ULT1M4T3CK/MareSphere',
        featured: true
      }
    ];

    for (const project of realProjects) {
      const existingProject = await pool.query(
        'SELECT id FROM projects WHERE title = $1',
        [project.title]
      );

      if (existingProject.rows.length === 0) {
        await pool.query(
          'INSERT INTO projects (title, description, image_path, technologies, project_url, github_url, featured) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [project.title, project.description, project.image_path, project.technologies, project.project_url, project.github_url, project.featured]
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
