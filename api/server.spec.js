
describe('should be the correct database environment', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })
})
