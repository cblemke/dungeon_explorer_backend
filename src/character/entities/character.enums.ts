export enum CharacterState {
    Healthy = 'healthy',         // Sano
    SlightlyInjured = 'slightly_injured', // Levemente herido
    SeverelyInjured = 'severely_injured',  // Gravemente herido
    Dead = 'dead' // muerto
  }


export enum CharacterRace {
    Human = 'human',         
    Dwarf = 'dwarf', 
    Elf = 'elf',  
    Halfling = 'halfling' 
}

export enum CharacterClass {
  Bard = 'bard',
  Barbarian = 'barbarian',
  Cleric = 'cleric',
  Warrior = 'warrior',
  Druid = 'druid',
  Mage = 'mage',
  Rogue = 'rogue'
}

export enum CharacterGender {
  Male = 'male',
  Female = 'female'
}

export enum CharacterWeaponRarity {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary'  
}


export enum CharacterAppareanceFeature {
  Type0 = 0,
  Type1 = 1,
  Type2 = 2,
  Type3 = 3,
  Type4 = 4
}
