// Gerenciamento de configurações e modal
export class SettingsManager {
  constructor() {
    this.settingsModal = document.getElementById('settings-modal');
    this.btnSettings = document.getElementById('btn-settings');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.difficultySelectModal = document.getElementById('difficulty-select-modal');
    this.settingsContent = document.querySelector('.settings-content');
    
    this.initializeSettings();
  }

  initializeSettings() {
    if (this.btnSettings) {
      this.btnSettings.onclick = () => this.abrirModal();
    }
    
    if (this.btnCloseSettings) {
      this.btnCloseSettings.onclick = () => this.fecharModal();
    }
    
    if (this.settingsModal) {
      this.settingsModal.onclick = (e) => {
        if (e.target === this.settingsModal) this.fecharModal();
      };
    }
    
    if (this.settingsContent) {
      this.settingsContent.onclick = (e) => {
        e.stopPropagation();
      };
    }
  }

  abrirModal() {
    this.settingsModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (this.btnCloseSettings) this.btnCloseSettings.focus();
    console.log('Modal aberto');
  }

  fecharModal() {
    this.settingsModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    console.log('Modal fechado');
  }

  setDifficultyChangeCallback(callback) {
    if (this.difficultySelectModal) {
      this.difficultySelectModal.onchange = (e) => {
        callback(e.target.value);
      };
    }
  }
}
