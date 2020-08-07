from typing import Dict, TypedDict, List, Union, Literal

SeasonsDict = Dict[Union[Literal['spring'], Literal['summer'], Literal['fall'], Literal['winter']], bool]


class Item(TypedDict, total=False):
    id: str
    isCraftable: bool
    name: str
    description: str
    category: str
    url: str
    sources: List[str]
    seasons: SeasonsDict
    locations: List[str]
    time: List[int]
    weather: str
    water: str
    artifactSpots: Dict[str, float]
    ingredients: Dict[str, int]
    monsterDrops: Dict[str, float]
    recipeSources: List[str]
    imgData: str


# Only contains used fields
class MediaWikiRevision(TypedDict, total=False):
    content: str


class MediaWikiPage(TypedDict, total=False):
    title: str
    revisions: List[MediaWikiRevision]


class MediaWikiQueryResult(TypedDict, total=False):
    pages: List[MediaWikiPage]


class MediaWikiParseResult(TypedDict, total=False):
    text: str


class MediaWikiResponse(TypedDict, total=False):
    query: MediaWikiQueryResult
    parse: MediaWikiParseResult


class Villager(TypedDict, total=False):
    name: str
    datable: bool
    loves: List[str]
    likes: List[str]
    neutral: List[str]
    dislikes: List[str]
    hates: List[str]
    birthDay: int
    birthSeason: int


class Recipe(TypedDict, total=False):
    name: str
    ingredients: Dict[str, int]
    result: str
    amount: int
    recipeSources: List[str]


class BundleItem(TypedDict):
    id: str
    amount: int
    quality: int


class Bundle(TypedDict):
    name: str
    section: str
    slots: int
    items: List[BundleItem]
    gold: int
