export default function handleWindowControls(remote) {
  console.log(remote)
  function init() {
    let window = remote.getCurrentWindow();
    const minButton = document.getElementById('min-button');
    const maxButton = document.getElementById('max-button');
    const restoreButton = document.getElementById('restore-button');
    const closeButton = document.getElementById('close-button');

    function toggleMaxRestoreButtons() {
      window = remote.getCurrentWindow();
      if (window.isMaximized()) {
        maxButton.style.display = 'none';
        restoreButton.style.display = 'flex';
      } else {
        restoreButton.style.display = 'none';
        maxButton.style.display = 'flex';
      }
    }
    // Toggle maximise/restore buttons when maximisation/unmaximisation
    // occurs by means other than button clicks e.g. double-clicking
    // the title bar:
    toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);

    closeButton.addEventListener('click', () => {
      window = remote.getCurrentWindow();
      window.close();
    });

    minButton.addEventListener('click', () => {
      window = remote.getCurrentWindow();
      window.minimize();
    });

    maxButton.addEventListener('click', () => {
      window = remote.getCurrentWindow();
      window.maximize();
      toggleMaxRestoreButtons();
    });

    restoreButton.addEventListener('click', () => {
      window = remote.getCurrentWindow();
      window.unmaximize();
      toggleMaxRestoreButtons();
    });
  }
  // When document has loaded, initialise
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      init();
    }
  };
}
