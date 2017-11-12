/**
 * Simple button class
 */

class jscge_Button {
  constructor (id) {
    this.button = id
    this.down = false
    this._downEvents = []
    this._upEvents = []
  }

  // Add an event
  addDownEvent (callback) {
    this._downEvents.push(callback)
  }
  addUpEvent (callback) {
    this._upEvents.push(callback)
  }

  // Run all events bound to button up/down
  press () {
    this.down = true
    for (const fn of this._downEvents) {
      fn()
    }
  }
  release () {
    this.down = false
    for (const fn of this._upEvents) {
      fn()
    }
  }
}

/**
 * Class for keeping track of multiple button states
 * and applying event listeners to press & release events
 */

class jscge_ButtonMap {
  constructor () {
    this._buttons = {}
  }

  // PRIVATE METHODS

  // Gets a button from the map
  // Returns undefined if it doesn't exist
  _getButton (button) {
    if (this._buttons.hasOwnProperty(button)) {
      return this._buttons[button]
    }
    return undefined
  }

  // Adds a button to the button map and return it
  _addButton (button) {
    const newButton = new jscge_Button(button)
    this._buttons[button] = newButton
    return newButton
  }

  // Add to map if undefined
  _getOrAddButton (button) {
    const b = this._getButton(button)
    if (b) {
      return b
    }
    return this._addButton(button)
  }

  // Handle button press
  _handleButtonDown (button) {
    const b = this._getOrAddButton(button)
    if (!b.down) {
      b.press()
    }
  }

  // Handle button release
  _handleButtonUp (button) {
    const b = this._getOrAddButton(button)
    if (b.down) {
      b.release()
    }
  }

  // Add a callback event to button press
  _addDownEvent (button, callback) {
    const b = this._getOrAddButton(button)
    b.addDownEvent(callback)
  }

  // Add a callback event to button release
  _addUpEvent (button, callback) {
    const b = this._getOrAddButton(button)
    b.addUpEvent(callback)
  }

  // PUBLIC METHODS

  // Checks if a button is pressed
  checkPressed (button) {
    const b = this._getOrAddButton(button)
    return b.down
  }
}

export default jscge_ButtonMap
