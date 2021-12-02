export const Auth = () => {
  return (
    <form className="p-5 bg-light w-50 ">
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group mt-4">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <div className="form-group mt-4">
      <label for="exampleInputPassword1">Role</label>
        <select class="form-select">
          <option selected>Who are you?</option>
          <option value="1">Passenger</option>
          <option value="2">Driver</option>
        </select>
      </div>

      <button type="submit" className="btn btn-dark mt-4">
        Submit
      </button>
    </form>
  );
};
