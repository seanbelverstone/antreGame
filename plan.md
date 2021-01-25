### Adventure Game (As yet untitled)

#### Key Features
- Login and account creation
- Ability to save progress
- Multiple classes (warrior, mage, rogue etc)
- Medieval setting
- Turn based attack/defense/item usage
- Usage of RNG for moves, enhanced by equipped items
- Inventory
- Spiderweb-style structure of progression, 4 different options per encounter
- Upon death, revert to start

#### Nice-to-haves
- Achievements
- Stats
- Level-up system
- Sprites?

#### Technologies
- React
- Redux (for easy state management)
- Node
- Material.ui


#### REDUX NOTES
Store methods:
- getState for reading the current state of the application
- dispatch for dispatching an action
- subscribe for listening to state changes

**mapStateToProps** does exactly what its name suggests: **it connects a part of the Redux state to the props of a React component.** By doing so a connected React component will have access to the exact part of the store it needs.

**mapDispatchToProps** does something similar, but for actions. **mapDispatchToProps connects Redux actions to React props.** This way a connected React component will be able to send messages to the store.