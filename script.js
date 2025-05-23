document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    // Save preference to localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    body.classList.remove("dark-mode")
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    // Toggle hamburger to X
    const spans = mobileMenuBtn.querySelectorAll("span")
    spans.forEach((span) => span.classList.toggle("active"))
  })

  // Close mobile menu when clicking a link
  const navLinksItems = document.querySelectorAll(".nav-links a")
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")

        const spans = mobileMenuBtn.querySelectorAll("span")
        spans.forEach((span) => span.classList.remove("active"))
      }
    })
  })

  // Skills Cloud
  const skills = [
    // Backend
    { name: "Django", category: "backend" },
    { name: "Django REST Framework", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "C#", category: "backend" },
    { name: "Go", category: "backend" },

    // Frontend
    { name: "React", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "HTML", category: "frontend" },
    { name: "CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },

    // ML/DSA
    { name: "TensorFlow", category: "ml" },
    { name: "Scikit-learn", category: "ml" },
    { name: "NumPy", category: "ml" },
    { name: "LeetCode", category: "dsa" },
    { name: "Codeforces", category: "dsa" },
    { name: "Data Structures", category: "dsa" },
    { name: "Algorithms", category: "dsa" },

    // DevOps/Tools
    { name: "Git", category: "tools" },
    { name: "GitHub", category: "tools" },
    { name: "Linux", category: "tools" },
    { name: "AWS EC2", category: "devops" },
    { name: "Heroku", category: "devops" },
    { name: "Docker", category: "devops" },
  ]

  // Find the container for skill badges
  const skillsCloud = document.getElementById("skills-cloud")

  // Only create and append skill badges if the skills cloud element exists
  // This prevents errors when viewing pages that don't have the skills section (like blog-post.html)
  if (skillsCloud) {
    // Create and append skill badges
    skills.forEach((skill) => {
      const badge = document.createElement("div")
      badge.className = `skill-badge skill-${skill.category}`
      badge.textContent = skill.name

      // Add random animation
      const duration = 5 + Math.random() * 5
      const delay = Math.random() * 5

      badge.style.animation = `float ${duration}s ease-in-out infinite`
      badge.style.animationDelay = `${delay}s`

      skillsCloud.appendChild(badge)
    })
  }

  // Load Blog Posts from data.json
  const blogGrid = document.querySelector(".blog-grid")

  if (blogGrid) {
    loadBlogPosts()
  }

  // Check if we're on a blog post page
  const blogPostContent = document.querySelector(".blog-post-content")
  if (blogPostContent) {
    // Get the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get("id")

    if (postId) {
      loadBlogPost(postId)
    }
  }

  // Form Submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // In a real application, you would send this data to a server
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll animation for elements
  const animateOnScroll = () => {
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible")
      }
    })
  }

  // Initial check
  animateOnScroll()

  // Listen for scroll
  window.addEventListener("scroll", animateOnScroll)
})

// Function to load blog posts from data.json
function loadBlogPosts() {
  const blogGrid = document.querySelector(".blog-grid")

  // First try to fetch the data.json file
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load blog posts")
      }
      return response.json()
    })
    .then((data) => {
      if (data.blogPosts && data.blogPosts.length > 0) {
        // Clear any existing content
        blogGrid.innerHTML = ""

        // Add each blog post
        data.blogPosts.forEach((post) => {
          const postCard = document.createElement("div")
          postCard.className = "card"

          postCard.innerHTML = `
            <div class="card-header">
              <h3 class="blog-post-title">${post.title}</h3>
              <span class="card-date">${post.date}</span>
            </div>
            <div class="card-body">
              <p class="blog-post-excerpt">${post.excerpt}</p>
            </div>
            <div class="card-footer">
              <a href="blog-post.html?id=${post.id}" class="btn btn-ghost">Read More</a>
            </div>
          `

          blogGrid.appendChild(postCard)
        })
      } else {
        // No blog posts found in data.json
        console.log("No blog posts found in data.json")
        // Keep the default blog posts in the HTML
      }
    })
    .catch((error) => {
      console.error("Error loading blog posts from data.json:", error)
      // Keep the default blog posts in the HTML
      // No need to display an error message since we have fallback content
    })
}

// Function to load a specific blog post
function loadBlogPost(postId) {
  const blogPostTitle = document.querySelector(".blog-post-title")
  const blogPostDate = document.querySelector(".blog-post-date")
  const blogPostContent = document.querySelector(".blog-post-content")

  // Define fallback content for common blog posts
  const fallbackPosts = {
    "solving-leetcode-daily": {
      title: "Solving LeetCode Daily with A2SV",
      date: "May 10, 2023",
      content: `<p>As a member of Africa to Silicon Valley (A2SV), I've committed to solving at least one LeetCode problem every day. This consistent practice has dramatically improved my algorithmic thinking and problem-solving abilities.</p>
      <h2>The A2SV Approach</h2>
      <p>A2SV has a structured approach to tackling data structures and algorithms:</p>
      <ol>
        <li>Start with the problem statement: Understand exactly what is being asked</li>
        <li>Work through examples: Test your understanding with the provided examples</li>
        <li>Brainstorm approaches: Consider multiple solutions before coding</li>
        <li>Analyze time and space complexity: Optimize before implementation</li>
        <li>Code the solution: Implement the most efficient approach</li>
        <li>Test edge cases: Ensure your solution handles all scenarios</li>
      </ol>
      <h2>My Daily Routine</h2>
      <p>Every morning, I spend 1-2 hours on LeetCode, following these steps:</p>
      <ul>
        <li>Solve the daily challenge</li>
        <li>Review solutions from others</li>
        <li>Document my approach and learnings</li>
        <li>Revisit similar problems to reinforce patterns</li>
        </ul>
      <p>This consistent practice has helped me recognize common patterns in algorithmic problems and develop a toolkit of approaches for different problem types.</p>`,
    },
    "building-clean-rest-apis": {
      title: "Building Clean REST APIs with Django",
      date: "April 15, 2023",
      content: `<p>Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. In this post, I'll share best practices I've learned for creating clean, maintainable, and efficient REST APIs.</p>
      <h2>API Design Principles</h2>
      <p>Before writing any code, it's important to establish solid design principles:</p>
      <ul>
        <li><strong>Use resources as your primary abstraction</strong>: Design your API around resources (nouns) rather than actions (verbs)</li>
        <li><strong>Use HTTP methods appropriately</strong>: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal</li>
        <li><strong>Use nested resources judiciously</strong>: Avoid deeply nested URLs</li>
        <li><strong>Versioning from day one</strong>: Include API versioning in your URL structure</li>
      </ul>
      <h2>Serializers: The Heart of DRF</h2>
      <p>Serializers convert complex data types (like Django models) to Python primitives that can be rendered into JSON. Here are some best practices:</p>
      <p>1. <strong>Use nested serializers for related objects</strong></p>
      <p>2. <strong>Create separate serializers for different use cases</strong></p>`,
    },
    "deploying-python-projects": {
      title: "Deploying Python Projects to AWS EC2",
      date: "March 22, 2023",
      content: `<p>Deploying a Django application to production involves several steps to ensure it's secure, performant, and reliable. In this guide, I'll walk through the process of deploying a Django application on an AWS EC2 instance using Nginx as a reverse proxy and Gunicorn as the WSGI server.</p>
      <h2>1. Setting Up Your EC2 Instance</h2>
      <p>First, you'll need to create and configure an EC2 instance:</p>
      <ol>
        <li>Log in to the AWS Management Console</li>
        <li>Launch a new EC2 instance (Ubuntu Server is a good choice)</li>
        <li>Configure security groups to allow HTTP (80), HTTPS (443), and SSH (22)</li>
        <li>Create and download your key pair</li>
        <li>Connect to your instance via SSH</li>
      </ol>
      <h2>2. Installing Required Packages</h2>
      <p>Update your system and install the necessary packages:</p>
      <p>Create a Python virtual environment:</p>
      <h2>3. Setting Up Your Django Project</h2>
      <p>Clone your project from version control:</p>`,
    },
  }

  // Try to fetch from data.json first
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load blog post")
      }
      return response.json()
    })
    .then((data) => {
      const post = data.blogPosts.find((post) => post.id === postId)

      if (post) {
        // Update the page title
        document.title = `${post.title} | Jaefer Kemal`

        // Update the blog post content
        blogPostTitle.textContent = post.title
        blogPostDate.textContent = post.date
        blogPostContent.innerHTML = post.content
      } else {
        // If post not found in data.json, check fallback
        useFallbackPost(postId)
      }
    })
    .catch((error) => {
      console.error("Error loading blog post from data.json:", error)
      // Use fallback content
    })
}

// Function to use fallback post content
function useFallbackPost(postId) {
  const blogPostTitle = document.querySelector(".blog-post-title")
  const blogPostDate = document.querySelector(".blog-post-date")
  const blogPostContent = document.querySelector(".blog-post-content")

  const fallbackPosts = {
    "solving-leetcode-daily": {
      title: "Solving LeetCode Daily with A2SV",
      date: "May 10, 2024",
      content: `<p>As a member of Africa to Silicon Valley (A2SV), I've committed to solving at least one LeetCode problem every day. This consistent practice has dramatically improved my algorithmic thinking and problem-solving abilities.</p>
      <h2>The A2SV Approach</h2>
      <p>A2SV has a structured approach to tackling data structures and algorithms:</p>
      <ol>
        <li>Start with the problem statement: Understand exactly what is being asked</li>
        <li>Work through examples: Test your understanding with the provided examples</li>
        <li>Brainstorm approaches: Consider multiple solutions before coding</li>
        <li>Analyze time and space complexity: Optimize before implementation</li>
        <li>Code the solution: Implement the most efficient approach</li>
        <li>Test edge cases: Ensure your solution handles all scenarios</li>
      </ol>
      <h2>My Daily Routine</h2>
      <p>Every morning, I spend 1-2 hours on LeetCode, following these steps:</p>
      <ul>
        <li>Solve the daily challenge</li>
        <li>Review solutions from others</li>
        <li>Document my approach and learnings</li>
        <li>Revisit similar problems to reinforce patterns</li>
        </ul>
      <p>This consistent practice has helped me recognize common patterns in algorithmic problems and develop a toolkit of approaches for different problem types.</p>`,
    },
    "building-clean-rest-apis": {
      title: "Building Clean REST APIs with Django",
      date: "April 15, 2023",
      content: `<p>Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. In this post, I'll share best practices I've learned for creating clean, maintainable, and efficient REST APIs.</p>
      <h2>API Design Principles</h2>
      <p>Before writing any code, it's important to establish solid design principles:</p>
      <ul>
        <li><strong>Use resources as your primary abstraction</strong>: Design your API around resources (nouns) rather than actions (verbs)</li>
        <li><strong>Use HTTP methods appropriately</strong>: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal</li>
        <li><strong>Use nested resources judiciously</strong>: Avoid deeply nested URLs</li>
        <li><strong>Versioning from day one</strong>: Include API versioning in your URL structure</li>
      </ul>
      <h2>Serializers: The Heart of DRF</h2>
      <p>Serializers convert complex data types (like Django models) to Python primitives that can be rendered into JSON. Here are some best practices:</p>
      <p>1. <strong>Use nested serializers for related objects</strong></p>
      <p>2. <strong>Create separate serializers for different use cases</strong></p>`,
    },
    "deploying-python-projects": {
      title: "Deploying Python Projects to AWS EC2",
      date: "March 22, 2023",
      content: `<p>Deploying a Django application to production involves several steps to ensure it's secure, performant, and reliable. In this guide, I'll walk through the process of deploying a Django application on an AWS EC2 instance using Nginx as a reverse proxy and Gunicorn as the WSGI server.</p>
      <h2>1. Setting Up Your EC2 Instance</h2>
      <p>First, you'll need to create and configure an EC2 instance:</p>
      <ol>
        <li>Log in to the AWS Management Console</li>
        <li>Launch a new EC2 instance (Ubuntu Server is a good choice)</li>
        <li>Configure security groups to allow HTTP (80), HTTPS (443), and SSH (22)</li>
        <li>Create and download your key pair</li>
        <li>Connect to your instance via SSH</li>
      </ol>
      <h2>2. Installing Required Packages</h2>
      <p>Update your system and install the necessary packages:</p>
      <p>Create a Python virtual environment:</p>
      <h2>3. Setting Up Your Django Project</h2>
      <p>Clone your project from version control:</p>`,
    },
  }

  const fallbackPost = fallbackPosts[postId]
  if (fallbackPost) {
    document.title = `${fallbackPost.title} | Jaefer Kemal`
    blogPostTitle.textContent = fallbackPost.title
    blogPostDate.textContent = fallbackPost.date
    blogPostContent.innerHTML = fallbackPost.content
  } else {
    blogPostTitle.textContent = "Post Not Found"
    blogPostContent.innerHTML = `
      <p>The blog post you're looking for could not be found.</p>
      <p>Please return to the <a href="index.html#blog" class="text-primary">blog section</a> to see available posts.</p>
    `
  }
}
