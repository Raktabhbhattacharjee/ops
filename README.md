# Docker, Redis & LLM Stuff

My personal learning thing. Docker to put apps in boxes, Redis for when you need to remember stuff fast, and LLMs because AI is kinda everywhere. All code, no boring lectures.

## 📚 What's This?

Just building my way through useful stuff. Start with Docker, move to Redis, then LLMs. Each part is independent but connects to the next. It's all about getting things to actually work.

## 🗂️ The Levels

### **Level 1: Getting Started with Docker**

We start here. Getting your hands dirty with containers before we get into the complex stuff.

#### `01-dockerizing-node-app/`

Taking a simple Node app and dockerizing it. You'll learn:

- How to write a Dockerfile
- Building images and running containers
- Common pitfalls and how to avoid them

#### `02-docker-compose/`

Now we get a bit fancier. Running multiple services together (backend + frontend).

- Getting services to talk to each other
- Managing data with volumes
- Running a full stack locally

---

### **Level 2+: On the Way**

Redis (caching, real-time stuff, sessions), and LLMs (using AI, prompts, APIs).

## 🎯 What's in Here

Stuff that's actually useful:

✅ **Docker**

- Putting your apps in containers (so they work everywhere)
- Running frontend + backend together
- Not messing things up in the process

✅ **Redis**

- What it is and why you'd use it
- Storing stuff that needs to be fast
- Sessions and real-time things
- The different data types

✅ **LLMs & AI**

- How these models actually work
- Using OpenAI, Claude, etc
- Writing prompts that get good answers
- Making apps that use AI
- Vector databases for searching
- Training models for your stuff

## 🚀 Get Started

### Need

- Docker running
- Docker Compose
- (Later stuff needs Redis, Node, Python—we'll figure it out)

### Quick Stuff for Level 1

1. **Containerize a Node.js app:**

   ```bash
   cd level1/01-dockerizing-node-app
   docker build -t node-app .
   docker run -p 3000:3000 node-app
   ```

2. **Run the full stack:**
   ```bash
   cd level1/02-docker-compose
   docker-compose up --build
   ```

## 📝 What to Do

1. Start: `level1/01-dockerizing-node-app/` - get docker working
2. Then: `level1/02-docker-compose/` - run stuff together
3. Next: Level 2 - Redis
4. Then: Level 3 - LLMs

## 💡 How to Use This

- Jump in wherever you want
- Actually run the code, don't just read it
- Break stuff on purpose, that's how you learn
- Do levels in order, each one sets up the next

## 🔑 Topics (Getting Harder)

### Level 1

- Docker - the basics
- Docker Compose - running multiple things
- Networking - containers talking to each other
- Volumes - keeping data around

### Level 2 (Planning)

- Redis - making things fast
- Data types - strings, lists, sets, all that
- Sessions - keeping users logged in
- Caching - not asking the DB for the same thing twice
- Real-time - pub/sub and live updates

### Level 3 (Planning)

- LLMs - how they work
- APIs - OpenAI, Claude, Hugging Face
- Prompts - how to ask AI for stuff
- Embeddings - weird math for meaning
- Building with AI - chatbots, generation, etc
- Training - making it your own

## 💡 Tips

- Don't skip levels, it'll bite you
- Actually read the errors - they say what's wrong
- Change stuff, see what breaks
- Write down what worked
- Watch the logs, it's actually interesting
- Play with the networking stuff

## 📖 Useful Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Redis Official Documentation](https://redis.io/documentation)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude Docs](https://www.anthropic.com/)
- [Hugging Face Models](https://huggingface.co/models)
- [LLM Learning Path](https://www.deeplearning.ai/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

## 🚧 What's Done & What's Next

- [x] Level 1: Docker stuff
- [ ] Level 2: Redis
- [ ] Level 3: LLMs

## 🤝 Got Ideas?

Find something broken or have a better way? Let me know. It's just a learning repo, so feedback helps.

---

**That's it. Go build stuff. 🚀**
