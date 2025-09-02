import { Router, Request, Response } from 'express';
import pool from '../database/config';
import { authenticateToken, isAdmin } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = Router();

// Get all projects (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get featured projects (public)
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get project by ID (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new project (admin only)
router.post('/', authenticateToken, isAdmin, [
  body('title').trim().isLength({ min: 1, max: 255 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
  body('image_path').optional().trim(),
  body('technologies').isArray(),
  body('project_url').optional().trim().custom((value) => {
    if (value && value.trim() !== '') {
      // If value exists and is not empty, validate as URL
      if (!/^https?:\/\/.+/.test(value)) {
        throw new Error('Project URL must be a valid HTTP/HTTPS URL');
      }
    }
    return true;
  }),
  body('github_url').optional().trim().custom((value) => {
    if (value && value.trim() !== '') {
      // If value exists and is not empty, validate as URL
      if (!/^https?:\/\/.+/.test(value)) {
        throw new Error('GitHub URL must be a valid HTTP/HTTPS URL');
      }
    }
    return true;
  }),
  body('featured').isBoolean().optional()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, image_path, technologies, project_url, github_url, featured } = req.body;
    
    console.log('Creating project with data:', { title, description, image_path, technologies, project_url, github_url, featured });
    
    const result = await pool.query(
      `INSERT INTO projects (title, description, image_path, technologies, project_url, github_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, image_path, technologies, project_url, github_url, featured || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, isAdmin, [
  body('title').trim().isLength({ min: 1, max: 255 }).escape(),
  body('description').trim().isLength({ min: 1 }).escape(),
  body('image_path').optional().trim(),
  body('technologies').isArray(),
  body('project_url').optional().trim().custom((value) => {
    if (value && value.trim() !== '') {
      // If value exists and is not empty, validate as URL
      if (!/^https?:\/\/.+/.test(value)) {
        throw new Error('Project URL must be a valid HTTP/HTTPS URL');
      }
    }
    return true;
  }),
  body('github_url').optional().trim().custom((value) => {
    if (value && value.trim() !== '') {
      // If value exists and is not empty, validate as URL
      if (!/^https?:\/\/.+/.test(value)) {
        throw new Error('GitHub URL must be a valid HTTP/HTTPS URL');
      }
    }
    return true;
  }),
  body('featured').isBoolean().optional()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, image_path, technologies, project_url, github_url, featured } = req.body;
    
    console.log('Updating project with data:', { id, title, description, image_path, technologies, project_url, github_url, featured });
    
    const result = await pool.query(
      `UPDATE projects 
       SET title = $1, description = $2, image_path = $3, technologies = $4, 
           project_url = $5, github_url = $6, featured = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, image_path, technologies, project_url, github_url, featured || false, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
