import Button from "./Button";

function Start({ handleSubmit }) {
  return (
    <form className="mx-auto p-5 bg-zinc-100 text-shadow-zinc-950 rounded-2xl">
      <Button handleClick={handleSubmit}>
        Start Game
      </Button>
    </form>
  )
}

export default Start;