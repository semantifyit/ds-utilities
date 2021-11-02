class ErrorEntry {
  constructor(severity, path, description) {
    this.severity = severity; // Warning, Error, Critical
    this.path = path;
    this.description = description;
  }
}

module.exports = ErrorEntry;
