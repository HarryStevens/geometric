workflow "Test the library" {
  on = "push"
  resolves = ["Build app"]
}

action "Setup" {
  uses = "docker://node:10-alpine"
  runs = "npm"
  args = "install"
}

action "Run tests" {
  uses = "docker://node:10-alpine"
  needs = ["Setup"]
  runs = "npm"
  args = "test"
}
