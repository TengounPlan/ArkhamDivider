import { IEncounterSet, IScenario, IStory } from "./api"
import { CardType, IXPCost } from "./game"

export enum DividerType {
    PLAYER = 'player',
    SCENARIO = 'scenario',
    CAMPAIGN = 'campaign',
    INVESTIGATOR = 'investigator',
    ENCOUNTER = 'encounter'
}

export type IDivider = {
    id: string
    story?: IStory
    scenario?: IScenario
    encounterSet?: IEncounterSet
    type: DividerType
    name?: string
    icon?: string
    specialIcon?: string
    faction?: string
    cardType?: CardType
    background?: string
    previewIcon?: string
    campaignIcon?: string
    xpCost?: IXPCost,
    size?: number

    displaySideXP?: boolean
    displayNumericXP?: boolean
    displayCampaignIcon?: boolean

    tags?: string[]
}

export type IDividerList = IDivider[];
