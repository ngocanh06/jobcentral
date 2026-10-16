import { Router, Request, Response } from 'express';
import { aiEngineService } from './aiEngine.service.js';

export const aiEngineRouter = Router();

/**
 * POST /api/ai/match-job
 * Body: { candidateSkills: string[], jobRequirements: string[], experienceYears?: number }
 */
aiEngineRouter.post('/match-job', (req: Request, res: Response) => {
  try {
    const { candidateSkills = [], jobRequirements = [], experienceYears } = req.body;

    const result = aiEngineService.calculateMatchScore({
      candidateSkills,
      jobRequirements,
      experienceYears,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error in AI engine matching:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi xử lý AI matching.',
      error: error?.message,
    });
  }
});
