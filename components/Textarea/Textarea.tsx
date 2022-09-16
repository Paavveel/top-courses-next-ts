import cn from 'classnames';
import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.props';

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea className={cn(className, styles.textarea)} {...props} />;
};