import classes from './NewFuturePost.module.css';

function NewFuturePost() {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Trade Item</label>
        <textarea id="body" required rows={3} />
      </p>
      <p>
        <label htmlFor="name">Poster</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}

export default NewFuturePost;