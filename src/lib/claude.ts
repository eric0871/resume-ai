import { ResumeAnalysis, JDAnalysis } from '@/types';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

/**
 * Helper to call Claude API
 */
async function callClaude(systemPrompt: string, userPrompt: string, maxTokens = 4096): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Claude API error:', error);
    throw new Error(`Claude API returned ${response.status}: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * Extract JSON from Claude's response text
 */
function extractJSON<T>(text: string): T {
  // Try markdown code block first
  const jsonMatch = text.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1]);
  }
  // Try raw JSON object
  const objectMatch = text.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    return JSON.parse(objectMatch[0]);
  }
  throw new Error('No valid JSON found in response');
}

// ─── MOCK DATA (fallback when no API key) ─────────────────────────────

const MOCK_ANALYSIS: ResumeAnalysis = {
  overallScore: 72,
  sections: {
    format: {
      score: 78,
      feedback: ['简历长度合适，控制在一页内', '使用了清晰的section分隔', '字体大小不够统一，建议正文统一用10-11pt'],
      suggestions: ['添加LinkedIn链接', '将技能部分移到更显眼的位置', '使用更专业的模板格式']
    },
    content: {
      score: 65,
      feedback: ['缺少量化的工作成果', '技术栈描述不够具体', 'Summary部分过于笼统'],
      suggestions: ['每条经验都加入数字指标', '按STAR法则重写工作经验', '用更有力的Action Verbs开头']
    },
    keywords: {
      found: ['Python', 'React', 'AWS', 'Machine Learning', 'SQL', 'Docker', 'Git'],
      missing: ['CI/CD', 'Agile', 'REST API', 'TypeScript', 'Kubernetes', 'Data Pipeline'],
      industryRelevance: 68
    },
    experience: {
      score: 70,
      feedback: ['实习经历描述偏向任务列表而非成就', '缺少业务影响的量化描述'],
      impactStatements: [
        { original: '负责开发公司内部管理系统', improved: 'Led development of internal management system serving 200+ employees, reducing manual processes by 40%' },
        { original: '参与机器学习模型训练', improved: 'Trained and deployed ML classification model achieving 94% accuracy, processing 10K+ daily predictions in production' },
        { original: '使用React开发前端页面', improved: 'Built 15+ responsive React components with TypeScript, improving page load time by 35% through code splitting' },
      ]
    },
    education: {
      score: 82,
      feedback: ['GPA展示合理', '相关课程列表有帮助', '建议添加相关的学术项目']
    }
  },
  summary: '简历整体结构合理，但在内容深度和关键词覆盖方面有提升空间。最大的改进点是将工作经验从"做了什么"改为"产生了什么影响"。建议重点优化量化指标和技术关键词覆盖率，以提升ATS通过率。',
  topImprovements: [
    '将每条工作经验改写为"Action Verb + 量化结果"格式，突出业务影响',
    '补充缺失的关键技术词：CI/CD, Agile, REST API, TypeScript，提升ATS匹配度',
    '在Summary中突出你的独特价值主张和目标职位，展示H1B候选人竞争力'
  ],
  targetRoles: ['Software Engineer', 'Full Stack Developer', 'Data Engineer', 'ML Engineer'],
  atsCompatibility: 71
};

// ─── RESUME ANALYSIS ──────────────────────────────────────────────────

const ANALYSIS_SYSTEM_PROMPT = `你是一位专业的简历分析专家，专注于帮助中国留学生优化简历以申请美国H1B技术岗位。

你的分析必须：
1. 所有反馈和建议都用简体中文撰写
2. 针对美国科技公司（FAANG、独角兽、中大型科技公司）的招聘标准
3. 考虑ATS（Applicant Tracking System）兼容性
4. 关注国际学生常见的简历问题
5. 提供具体的、可操作的改进建议

你必须严格按照指定的JSON格式返回结果，不要包含任何额外的文字说明。只返回JSON。`;

/**
 * Analyzes a resume using Claude API
 */
export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  if (!ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY not configured. Using mock analysis.');
    return MOCK_ANALYSIS;
  }

  const userPrompt = `请分析以下简历，并严格按照JSON格式返回分析结果。

简历内容：
---
${resumeText}
---

请返回以下精确JSON结构（所有feedback、suggestions、summary等文字内容必须用简体中文）：

{
  "overallScore": <0到100的整数，综合评分>,
  "sections": {
    "format": {
      "score": <0-100>,
      "feedback": ["格式方面的评价，至少3条"],
      "suggestions": ["格式改进建议，至少3条"]
    },
    "content": {
      "score": <0-100>,
      "feedback": ["内容质量评价，至少3条"],
      "suggestions": ["内容改进建议，至少3条"]
    },
    "keywords": {
      "found": ["简历中已包含的技术关键词"],
      "missing": ["建议添加的重要关键词，针对目标岗位"],
      "industryRelevance": <0-100，行业相关度>
    },
    "experience": {
      "score": <0-100>,
      "feedback": ["经验描述的评价，至少2条"],
      "impactStatements": [
        {
          "original": "简历中的原始描述（如果是中文就用中文，英文就用英文）",
          "improved": "优化后的英文描述，包含量化指标和Action Verb"
        }
      ]
    },
    "education": {
      "score": <0-100>,
      "feedback": ["教育背景评价，至少2条"]
    }
  },
  "summary": "200字以内的综合评价，概括简历优缺点和最重要的改进方向",
  "topImprovements": ["最重要的3个改进建议，按优先级排列"],
  "targetRoles": ["根据简历推荐的4-5个最匹配的职位名称（英文）"],
  "atsCompatibility": <0-100，ATS兼容性评分>
}`;

  try {
    const responseText = await callClaude(ANALYSIS_SYSTEM_PROMPT, userPrompt, 4096);
    return extractJSON<ResumeAnalysis>(responseText);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return MOCK_ANALYSIS;
  }
}

// ─── JD-TARGETED ANALYSIS ─────────────────────────────────────────────

const JD_ANALYSIS_SYSTEM_PROMPT = `你是一位专业的简历优化顾问，专注于帮助中国留学生针对特定职位描述（JD）优化简历。

你的任务是对比简历和职位描述，找出差距并提供针对性建议。
所有反馈必须用简体中文撰写。只返回JSON，不要有额外文字。`;

/**
 * Analyzes a resume against a specific job description
 */
export async function analyzeResumeWithJD(
  resumeText: string,
  jobDescription: string
): Promise<JDAnalysis> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('需要配置API密钥才能使用JD匹配分析功能');
  }

  const userPrompt = `请对比以下简历和职位描述，提供针对性的优化建议。

简历内容：
---
${resumeText}
---

职位描述（JD）：
---
${jobDescription}
---

请返回以下JSON结构（所有文字内容用简体中文）：

{
  "matchScore": <0-100，简历与JD的匹配度>,
  "matchedSkills": ["简历中已匹配JD要求的技能"],
  "missingSkills": ["JD要求但简历中缺失的技能"],
  "keywordGaps": ["需要在简历中添加的关键词"],
  "tailoredSuggestions": [
    {
      "section": "需要修改的简历部分（如Experience、Skills等）",
      "current": "当前内容描述",
      "suggested": "针对该JD的优化建议",
      "reason": "为什么这样修改能提升匹配度"
    }
  ],
  "summary": "200字以内的整体匹配分析和优化策略",
  "competitiveAdvantages": ["简历中对该职位的竞争优势"],
  "redFlags": ["可能导致被筛掉的问题点"]
}`;

  const responseText = await callClaude(JD_ANALYSIS_SYSTEM_PROMPT, userPrompt, 4096);
  return extractJSON<JDAnalysis>(responseText);
}

// ─── OPTIMIZED RESUME GENERATION ──────────────────────────────────────

const GENERATE_SYSTEM_PROMPT = `你是一位专业的简历撰写专家，专注于帮助中国留学生撰写高质量的英文简历。

你的目标是基于原始简历内容和分析建议，生成一份优化后的简历。

要求：
1. 简历内容必须用英文撰写（这是美国求职简历）
2. 使用强有力的Action Verbs开头
3. 每条经验都包含量化指标
4. 关键词密度适合ATS系统
5. 格式清晰，适合一页纸
6. 保留原始简历的真实信息，不要编造经历

返回纯文本格式的简历内容，使用Markdown格式以便后续渲染。`;

/**
 * Generates an optimized version of the resume
 */
export async function generateResumeWithClaude(
  resumeText: string,
  analysisResults?: ResumeAnalysis
): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('需要配置API密钥才能使用简历生成功能');
  }

  let context = '';
  if (analysisResults) {
    context = `

以下是AI分析出的改进建议，请在优化简历时重点考虑：
- 综合评分: ${analysisResults.overallScore}/100
- 最重要的改进: ${analysisResults.topImprovements.join('; ')}
- 缺失关键词: ${analysisResults.sections.keywords.missing.join(', ')}
- 目标职位: ${analysisResults.targetRoles.join(', ')}`;
  }

  const userPrompt = `请基于以下简历内容生成一份优化后的英文简历。

原始简历：
---
${resumeText}
---
${context}

请生成优化后的完整简历，使用Markdown格式。确保：
1. 保留所有真实信息（姓名、学校、公司等）
2. 优化每条经验的描述，使用Action Verb + 量化结果
3. 补充缺失的重要关键词
4. 整体结构适合ATS解析
5. 控制在一页A4纸的篇幅内`;

  return await callClaude(GENERATE_SYSTEM_PROMPT, userPrompt, 4096);
}
