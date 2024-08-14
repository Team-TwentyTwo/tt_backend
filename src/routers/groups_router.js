app.post('/groups', asyncHandler(async (req, res) => {
  const group = await prisma.user.creat({
    data: req.body,
  })

  res.status(201).send(group);
}))

app.get('/groups', asyncHandler(async (req, res) => {
  const groups = await prisma.user.findMany();

  res.send(groups);
}))

app.patch('/groups/:groupId', asyncHandler(async (req, res) => {
  assert(req.body, PatchGroup)

  const { groupId } = req.params;
  const group = await prisma.group.update({
    where: { groupId },
    data: req.body,
  })

  res.send(group);
}))

app.delete('/groups/:groupId', asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  await prisma.group.delete({
    where: { groupId },
  })

  res.sendStatus(204);
}))

app.get('/groups/:groupId', asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await prisma.group.findUniqueOrThrow({
    where: { groupId },
  });

  res.send(group);
}))

app.post('/groups/:groupId/verify-password', asyncHandler(async (req, res) => {
  
}))

app.post('/groups/:groupId/like', asyncHandler(async (req, res) => {
  
}))

app.get('/groups/:groupId/is-public', asyncHandler(async (req, res) => {
  
}))