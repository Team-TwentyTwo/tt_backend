app.post('/groups', asyncHandler(async (req, res) => {
  const group = await prisma.user.creat({
    data: req.body,
  })

  res.status(201).send(group);
}))

app.get('/groups', asyncHandler(async (req, res) => {
  
}))

app.put('/groups/:groupId', asyncHandler(async (req, res) => {
  
}))

app.delete('/groups/:groupId', asyncHandler(async (req, res) => {
  
}))

app.get('/groups/:groupId', asyncHandler(async (req, res) => {
  
}))

app.post('/groups/:groupId/verify-password', asyncHandler(async (req, res) => {
  
}))

app.post('/groups/:groupId/like', asyncHandler(async (req, res) => {
  
}))

app.get('/groups/:groupId/is-public', asyncHandler(async (req, res) => {
  
}))