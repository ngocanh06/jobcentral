export interface JobMatchParams {
  candidateSkills: string[];
  jobRequirements: string[];
  experienceYears?: number;
}

export interface JobMatchResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendation: string;
}

export class AiEngineService {
  /**
   * Tính điểm tương đồng giữa kỹ năng của ứng viên và yêu cầu công việc
   */
  public calculateMatchScore(params: JobMatchParams): JobMatchResult {
    const { candidateSkills, jobRequirements } = params;

    if (!jobRequirements || jobRequirements.length === 0) {
      return {
        matchScore: 100,
        matchingSkills: candidateSkills,
        missingSkills: [],
        recommendation: 'Không có yêu cầu cụ thể, hồ sơ của bạn phù hợp để ứng tuyển.',
      };
    }

    const normalizedCandidate = candidateSkills.map((s) => s.trim().toLowerCase());
    const matching: string[] = [];
    const missing: string[] = [];

    jobRequirements.forEach((req) => {
      const normalizedReq = req.trim().toLowerCase();
      const isMatch = normalizedCandidate.some(
        (cand) => cand.includes(normalizedReq) || normalizedReq.includes(cand)
      );

      if (isMatch) {
        matching.push(req);
      } else {
        missing.push(req);
      }
    });

    const matchScore = Math.round((matching.length / jobRequirements.length) * 100);

    let recommendation = 'Hồ sơ của bạn rất tiềm năng!';
    if (matchScore >= 80) {
      recommendation = 'Rất phù hợp! Kỹ năng của bạn đáp ứng hầu hết các yêu cầu tuyển dụng.';
    } else if (matchScore >= 50) {
      recommendation = 'Khá phù hợp. Bạn nên bổ sung hoặc làm nổi bật thêm một số kỹ năng còn thiếu.';
    } else {
      recommendation = 'Độ phù hợp chưa cao. Cân nhắc trau dồi thêm các kỹ năng cần thiết trước khi ứng tuyển.';
    }

    return {
      matchScore,
      matchingSkills: matching,
      missingSkills: missing,
      recommendation,
    };
  }
}

export const aiEngineService = new AiEngineService();
