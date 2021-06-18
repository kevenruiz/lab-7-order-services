
import Food from '../lib/models/Food.js';
import { sendSms } from '../lib/utils/twilio.js';


export default class FoodServices {
  static async create(foodObject) {
    const food = await Food.insert(foodObject);

    const message = await sendSms(
      //   process.env.ORDER_HANDLER_NUMBER,
      `New Food received for ${foodObject.name}`);
    console.log(message);
    return food;
  }


}
