document.querySelector('.Nav a').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  const paginationLinks = document.querySelectorAll('.pagination a');
  paginationLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
  
      const targetID = link.getAttribute('href');
  
      document.querySelector(targetID).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
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