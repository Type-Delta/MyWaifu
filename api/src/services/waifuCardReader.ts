import fs from 'fs/promises';
import { IWaifuCard } from '../models/interfaces/IWaifuCard';
import resourcesPlace from '../configurations/resourcesConstants';

class WaifuCardReader {
  public async readAsTxt(waifuPack: string): Promise<IWaifuCard> {
    const regexToGetBetweenBracket = /\[\s*([\w\W]*?)\s*\]/g;
    const content = await fs
      .readFile(`${resourcesPlace.WAIFU_PACK_COLLECTION_PATH}/${waifuPack}/card.txt`, 'utf-8');
    const waifuCard: IWaifuCard = {
      name: '',
      description: '',
      initialReply: '',
      chatExample: undefined,
    };

    waifuCard.name = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.name === '') {
      console.log('Waifu name not found\nCheck the card txt');
      throw new Error('Waifu name was not given');
    }

    waifuCard.description = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.description === '') {
      console.log('Waifu description not found\nCheck the card txt');
      throw new Error('Waifu description was not given');
    }

    waifuCard.initialReply = regexToGetBetweenBracket.exec(content)?.[1]?.trim() || '';

    if (waifuCard.initialReply === '') {
      console.log('Waifu initial reply not found\nCheck the card txt');
      throw new Error('Waifu initial reply was not given');
    }

    waifuCard.background = regexToGetBetweenBracket.exec(content)?.[1] || '';
    waifuCard.context = regexToGetBetweenBracket.exec(content)?.[1] || '';
    waifuCard.chatExample = regexToGetBetweenBracket.exec(content)?.[1] || '';

    return waifuCard;
  }
}

export default new WaifuCardReader();
