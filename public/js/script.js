// Add a click event listener to the Get Started button
document.querySelector('.Nav a').addEventListener('click', function() {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add a click event listener to each pagination link
  const paginationLinks = document.querySelectorAll('.pagination a');
  paginationLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Get the target section ID
      const targetID = link.getAttribute('href');
  
      // Scroll to the target section
      document.querySelector(targetID).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Add a scroll event listener to update the active pagination link
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset;
  
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
  
      if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(function(link) {
          link.classList.remove('active');
  
          if (link.getAttribute('href') === ('#' + section.id)) {
            link.classList.add('active');
          }
        });
      }
    });
  });