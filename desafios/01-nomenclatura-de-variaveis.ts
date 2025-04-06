// Nomenclatura de variáveis

const githubUserCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getGithubUserWithCategory(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUserInfoResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (githubUserInfoResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserInfo = await githubUserInfoResponse.json()

  const sortedUserCategories = githubUserCategories.sort((user, anotherUser) =>  user.followers - anotherUser.followers); 

  const githubUserCategory = sortedUserCategories.find(githubUserCategory => githubUserInfo.followers > githubUserCategory.followers)

  const githubUserWithCategory = {
    githubUsername,
    category: githubUserCategory.title
  }

  return githubUserWithCategory
}

getGithubUserWithCategory({ query: {
  username: 'josepholiveira'
}}, {})