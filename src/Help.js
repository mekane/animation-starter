/* This script appends a help div to the body and sets up key listeners to show and hide it */
const help = document.createElement('div');
help.id = 'help';
help.innerHTML = `
<h2>Commands</h2>
<ul style="padding: 0; list-style: none;">
  <li><strong>arrow keys</strong>: accelerate</li>
  <li><strong>p</strong>: pause</li>
  <li><strong>r</strong>: reset game</li>
  <li><strong>m</strong>: add a small meteorite</li>
  <li><strong>e</strong>: add a medium Earth-like planet</li>
  <li><strong>j</strong>: add a large Jupiter-like planet</li>
  <li><strong>i</strong>: show frames per second</li>
</ul>
`;
help.style.background = 'rgba(225,225,225,0.88)';
help.style.position = 'absolute';
help.style.left = '50%';
help.style.top = '32px';
help.style.transform = 'translate(-50%, 0)';
help.style.padding = '0 20px 4px';
help.style.border = '4px solid white';
help.style.borderRadius = '16px';
help.style.fontSize = '20px';
help.style.lineHeight = '28px';
help.style.display = 'none';
document.body.appendChild(help);
document.addEventListener('keyup', e => {
  if (e.key === '?') {
    if (help.style.display === 'none')
	  help.style.display = 'block';
    else
	  help.style.display = 'none';
  }
  if (e.key === 'Escape') {
    help.style.display = 'none';
  }
});

