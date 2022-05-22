import styles from './Elements.module.css';

export default function Element(props) {
  const { text_input, btn, textarea, select } = styles;

  switch (props.type) {
    case 'button':
      return (
        <button {...props} className={btn}>
          button
        </button>
      );
    case 'textarea':
      return <textarea {...props} className={textarea}></textarea>;
    case 'select':
      return (
        <select {...props} className={select}>
          <option>option 1</option>
        </select>
      );
    case 'input':
      return <input {...props} className={text_input}></input>;
    case 'radio':
      return <input {...props}></input>;
    case 'checkbox':
      return <input {...props}></input>;
    default:
      return (
        <input {...props} type={props.type} className={text_input}></input>
      );
  }
}
