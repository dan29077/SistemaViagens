export default class BaseDAO {
    constructor(key) {
    this.key = key;
    }
    
    
    _getAll() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
    }
    
    
    _saveAll(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    }
    
    
    getAll() {
    return this._getAll();
    }
    
    
    create(obj) {
    const list = this._getAll();
    list.push(obj);
    this._saveAll(list);
    }
    
    
    update(id, newObj) {
    const list = this._getAll().map((item) => (item.id === id ? newObj : item));
    this._saveAll(list);
    }
    
    
    delete(id) {
    const list = this._getAll().filter((item) => item.id !== id);
    this._saveAll(list);
    }
    }