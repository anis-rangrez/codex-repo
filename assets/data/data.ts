import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    title: 'Real Connections Start Here',
    description: 'Connect with verified users who share your interests and values',
    animation: require('../lottie animations/Success.json'),
    backgroundColor: '#6C47FF',
    textColor: '#FFFFFF',
  },
  {
    id: 2,
    title: 'Every User is Verified',
    description: 'AI-powered video verification ensures every person is authentic',
    animation: require('../lottie animations/Face scanning.json'),
    backgroundColor: '#FF2DF4',
    textColor: '#FFFFFF',
  },
  {
    id: 3,
    title: 'Earn from Engagement',
    description: 'Get rewarded for genuine interactions and quality content',
    animation: require('../lottie animations/congratulation.json'),
    backgroundColor: '#154F40',
    textColor: '#FFFFFF',
  },
  {
    id: 4,
    title: 'AI-Powered Safety',
    description: 'Advanced moderation keeps the platform safe and trustworthy',
    animation: require('../lottie animations/AI animation.json'),
    backgroundColor: '#FF2DF4',
    textColor: '#FFFFFF',
  },
];

export default data;