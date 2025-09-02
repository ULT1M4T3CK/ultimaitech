import { Router, Request, Response } from 'express';
import pool from '../database/config';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

// Record visitor (public)
router.post('/visit', async (req: Request, res: Response) => {
  try {
    const { page_visited } = req.body;
    const ip_address = req.ip || req.connection.remoteAddress || 'unknown';
    const user_agent = req.get('User-Agent') || 'unknown';

    await pool.query(
      'INSERT INTO visitor_stats (ip_address, user_agent, page_visited) VALUES ($1, $2, $3)',
      [ip_address, user_agent, page_visited]
    );

    res.json({ message: 'Visit recorded' });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get real-time visitor count (admin only)
router.get('/realtime', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM visitor_stats WHERE visited_at >= NOW() - INTERVAL \'1 hour\''
    );
    
    res.json({ 
      current_visitors: parseInt(result.rows[0].count),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching real-time stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get visitor statistics for last 30 days (admin only)
router.get('/stats', authenticateToken, isAdmin, async (req: Request, res: Response) => {
  try {
    // Total visitors in last 30 days
    const totalResult = await pool.query(
      'SELECT COUNT(*) as count FROM visitor_stats WHERE visited_at >= NOW() - INTERVAL \'30 days\''
    );

    // Daily breakdown for last 30 days
    const dailyResult = await pool.query(`
      SELECT 
        DATE(visited_at) as date,
        COUNT(*) as visits
      FROM visitor_stats 
      WHERE visited_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(visited_at)
      ORDER BY date DESC
    `);

    // Top visited pages
    const pagesResult = await pool.query(`
      SELECT 
        page_visited,
        COUNT(*) as visits
      FROM visitor_stats 
      WHERE visited_at >= NOW() - INTERVAL '30 days'
      GROUP BY page_visited
      ORDER BY visits DESC
      LIMIT 10
    `);

    res.json({
      total_visitors_30_days: parseInt(totalResult.rows[0].count),
      daily_breakdown: dailyResult.rows,
      top_pages: pagesResult.rows,
      period: '30 days'
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
