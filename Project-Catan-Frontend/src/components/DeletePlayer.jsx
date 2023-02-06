<form onSubmit={handleSubmit} className = {classes.form}>

<h1 className={classes.head}>Delete Player...</h1>

<label className={classes.label}>
    Who do you wish to delete...?
    <select id = "deleteid" name="deleteid" onChange={handlePlayerChange} className={classes.dropdown}>
      <option value="">Please Select...</option>
      {players
      .filter((player) => player.name !== "ADMIN" && player.id !== currentUserId)
      .map((player) => (
        <option key={player.id} value={player.id}>
          {player.name}
        </option>
      ))}
    </select>
</label>

<label htmlFor="code" className={classes.label} >Your ADMIN Code:</label>
<input className={classes.input} type="text" name = "code" onChange={handlePlayerChange} />
{errors.initiatorItems && <p>{errors.initiatorItems}</p>}
</form>