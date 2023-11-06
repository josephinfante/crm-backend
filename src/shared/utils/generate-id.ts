import { randomBytes } from 'crypto';

export class UniqueID {
  private static readonly TIMESTAMP_BYTES = 4;
  private static readonly RANDOM_BYTES = 5;
  private static readonly COUNTER_BYTES = 3;
  
  static generate(): string {
    const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const timestampBuffer = Buffer.alloc(UniqueID.TIMESTAMP_BYTES);
    timestampBuffer.writeUInt32BE(timestamp, 0);

    const randomBuffer = randomBytes(UniqueID.RANDOM_BYTES);
    const counterBuffer = randomBytes(UniqueID.COUNTER_BYTES);

    const objectIdBuffer = Buffer.concat([
      timestampBuffer,
      randomBuffer,
      counterBuffer,
    ]);

    // Convert the buffer to a hexadecimal string
    const objectIdHex = objectIdBuffer.toString('hex');

    // Insert hyphens at the specified positions
    const ID =
      objectIdHex.substring(0, 8) +
      '-' +
      objectIdHex.substring(8, 12) +
      '-' +
      objectIdHex.substring(12, 16) +
      '-' +
      objectIdHex.substring(16);

    return ID;
  }
}