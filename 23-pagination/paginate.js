const paginate = (followers) => {
  const itemsPerPage = 10

  const numberOfPages = 10

  const newFollwers = Array.from({length: numberOfPages}, (_ , index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start+itemsPerPage)
  })

  return newFollwers

}

export default paginate