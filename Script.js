  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navList = document.getElementById('nav-list');
  
  mobileToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
  
  // Scroll Header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Reveal on Scroll
  function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }
  
  window.addEventListener('scroll', reveal);
  reveal(); // To check for elements in view on page load
  
  // Counter Animation
  function animateCounter(id, start, end, duration) {
    let startTimestamp = null;
    const element = document.getElementById(id);
    
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + '+';
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  // Typing Animation
  const heroTitle = document.querySelector('.hero-title');
  const text = heroTitle.innerHTML;
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  
  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.5,
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('-1', 0, 20, 2000);
        animateCounter('counter-2', 0, 5, 2000);
        animateCounter('counter-3', 0, 2, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observer.observe(document.querySelector('.experience-badges'));

  // Portfolio Filter
const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Initialize all items as visible
portfolioItems.forEach(item => {
  item.style.display = 'block';
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all') {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else if (item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 100);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Portfolio Modal
const modal = document.getElementById('portfolio-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalClient = document.getElementById('modal-client');
const modalDate = document.getElementById('modal-date');
const modalSkills = document.getElementById('modal-skills');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');
const modalClose = document.querySelector('.portfolio-modal-close');
const modalDetailsTriggers = document.querySelectorAll('.portfolio-details-trigger');

// Portfolio data
const portfolioData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Design',
    client: 'Fashion Retailer',
    date: 'January 2025',
    skills: 'HTML, CSS, JavaScript, React, Node.js',
    description: 'A comprehensive e-commerce platform featuring product catalog, user accounts, shopping cart, payment processing, and order management. The site is fully responsive and optimized for mobile shopping experiences.',
    link: '#',
    image: '/api/placeholder/800/500'
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'Application',
    client: 'Productivity Startup',
    date: 'December 2024',
    skills: 'React, Redux, Firebase, Material UI',
    description: 'A feature-rich task management application that helps teams organize projects, assign tasks, track progress, and meet deadlines. Includes real-time updates, notifications, and collaboration tools.',
    link: '#',
    image: '/api/placeholder/800/500'
  },
  {
    id: 3,
    title: 'Dashboard UI',
    category: 'UI/UX Design',
    client: 'Analytics Company',
    date: 'November 2024',
    skills: 'Figma, Adobe XD, Tailwind CSS',
    description: 'A clean and intuitive dashboard interface that visualizes complex data through charts, graphs, and interactive elements. The design prioritizes accessibility while maintaining a modern aesthetic.',
    link: '#',
    image: '/api/placeholder/800/500'
  },
  {
    id: 4,
    title: 'Startup Landing Page',
    category: 'Web Design',
    client: 'Tech Startup',
    date: 'October 2024',
    skills: 'HTML, CSS, JavaScript, GSAP',
    description: 'A high-converting landing page designed to showcase the startup\'s product, highlight key features, and capture leads. Includes smooth animations, testimonials section, and integrated contact form.',
    link: '#',
    image: '/api/placeholder/800/500'
  },
  {
    id: 5,
    title: 'Fitness Tracking App',
    category: 'Application',
    client: 'Health & Wellness Brand',
    date: 'September 2024',
    skills: 'React Native, Redux, Node.js, MongoDB',
    description: 'A mobile application that helps users track workouts, monitor nutrition, set goals, and view progress over time. Features include custom workout plans, progress charts, and social sharing capabilities.',
    link: '#',
    image: '/api/placeholder/800/500'
  },
  {
    id: 6,
    title: 'Banking App UI',
    category: 'UI/UX Design',
    client: 'Financial Institution',
    date: 'August 2024',
    skills: 'Figma, Prototyping, Design Systems',
    description: 'A user-centered banking application interface that simplifies financial management while maintaining strong security. The design includes account overview, transaction history, bill payments, and investment tracking.',
    link: '#',
    image: '/api/placeholder/800/500'
  }
];

// Open modal with project details
modalDetailsTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    
    const projectId = parseInt(trigger.getAttribute('data-id'));
    const project = portfolioData.find(item => item.id === projectId);
    
    if (project) {
      modalImage.src = project.image;
      modalTitle.textContent = project.title;
      modalCategory.textContent = project.category;
      modalClient.textContent = project.client;
      modalDate.textContent = project.date;
      modalSkills.textContent = project.skills;
      modalDescription.textContent = project.description;
      modalLink.href = project.link;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close modal on ESC key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});