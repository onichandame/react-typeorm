# React Typeorm

React hooks components for typeorm in browser with localforage enabled.

# Usage

For detailed example, check the [storybook](https://onichandame.com/react-typeorm/) or the source.

## How It Works

Before using any hooks, prepare the entities that will be used.

1. call `useConnection` hook to set up a connection to the database. The connection is store globally and can be retrieved by calling the hook again. **Hence every connection must have a unique name**
2. call `useRepository` hook to get a repository(the associated entity must be passed to the `useConnection` hook)
3. use the repo as you wish or further use `useAllDocs` hook to bind all documents in a repository to a state variable(creatd by `useState`) so it can be used to trigger UI refresh.
