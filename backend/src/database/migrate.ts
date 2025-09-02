import pool from './config';
import dotenv from 'dotenv';

dotenv.config();

const migrateDatabase = async () => {
  try {
    console.log('Starting database migration...');

    // Check if image_path column exists
    const columnCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'image_path'
    `);

    if (columnCheck.rows.length === 0) {
      console.log('Adding image_path column...');
      
      // Add image_path column
      await pool.query(`
        ALTER TABLE projects 
        ADD COLUMN image_path VARCHAR(500)
      `);
    }

    // Check if image_url column still exists
    const imageUrlCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'image_url'
    `);

    if (imageUrlCheck.rows.length > 0) {
      console.log('Migrating data from image_url to image_path...');
      
      // Copy data from image_url to image_path if image_path is null or empty
      await pool.query(`
        UPDATE projects 
        SET image_path = image_url 
        WHERE image_url IS NOT NULL AND image_url != '' AND (image_path IS NULL OR image_path = '')
      `);

      console.log('Data migration completed.');
    }

    // Check current data to verify migration
    const projectsCheck = await pool.query(`
      SELECT id, title, image_url, image_path 
      FROM projects 
      LIMIT 5
    `);

    console.log('Sample projects after migration:');
    projectsCheck.rows.forEach(project => {
      console.log(`- ${project.title}: image_url=${project.image_url}, image_path=${project.image_path}`);
    });

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateDatabase();
