// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '../components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'components/common/Button', // 스토리북 왼쪽 메뉴에서 보일 이름
  component: Button,
  tags: ['autodocs'], // 자동으로 문서(Docs) 탭을 생성해줍니다
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 버튼 상태
export const Default: Story = {};

// 만약 버튼에 색상이나 텍스트를 props로 받는다면 아래처럼 추가 스토리를 만들 수 있습니다.
// 지금은 기본 버튼이라서 Default만 있어도 충분합니다!
