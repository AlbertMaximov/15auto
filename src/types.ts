export interface MeasuredEffect {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'must-have' | 'desirable' | 'perspective';
  categoryLabel: string;
  description: string;
  taskSolved?: string;
  whatWeCreate?: string;
  advantages: string[];
  measuredEffects?: MeasuredEffect[];
  imagePrompt?: string;
  imagePath: string;
  valueTag?: string;
}

