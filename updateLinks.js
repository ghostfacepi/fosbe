// Simple script to update links based on domain.txt content
fetch('domain.txt')
  .then(response => response.text())
  .then(domain => {
    domain = domain.trim();
    
    // Update itslearning links
    document.querySelectorAll('.nav-link-itslearning').forEach(link => {
      link.href = `http://${domain}/Itslearning`;
    });
    
    // Update untis links
    document.querySelectorAll('.nav-link-untis').forEach(link => {
      link.href = `http://${domain}/WebUntis`;
    });
  })
  .catch(error => console.error('Error loading domain.txt:', error));