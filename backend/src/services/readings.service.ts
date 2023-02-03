import readingRepository, {
  Reading,
} from "../repositories/readings.repository";

async function getUserReadings(user_id: number) {
  try {
    const userReadings = await readingRepository.listUserReadings(user_id);
    if (!userReadings) {
      throw Error();
    }
    return userReadings;
  } catch (error) {
    throw error();
  }
}

async function postReading(data: Reading) {
  try {
    return await readingRepository.createReading(data);
  } catch (error) {
    console.log(error);
    return;
  }
}

async function updateReview(
  newReview: string,
  user_id: number,
  book_api_id: string
) {
  try {
    const userReading = await readingRepository.findByBookAndUserId(
      book_api_id,
      user_id
    );
    return await readingRepository.updateReview(userReading.id, newReview);
  } catch (error) {
    throw error();
  }
}

async function updateGrade(
  newGrade: number,
  user_id: number,
  book_api_id: string
) {
  try {
    const userReading = await readingRepository.findByBookAndUserId(
      book_api_id,
      user_id
    );
    return await readingRepository.updateGrade(userReading.id, newGrade);
  } catch (error) {
    throw error();
  }
}

async function updateReadingDate(
  newDate: Date,
  user_id: number,
  book_api_id: string
) {
  try {
    const userReading = await readingRepository.findByBookAndUserId(
      book_api_id,
      user_id
    );
    return await readingRepository.updateReadingDate(userReading.id, newDate);
  } catch (error) {
    throw error();
  }
}

async function deleteReading(user_id: number, book_api_id: string) {
  try {
    const userReading = await readingRepository.findByBookAndUserId(
      book_api_id,
      user_id
    );
    if (!userReading) {
      throw Error();
    }
    return await readingRepository.deleteReading(userReading.id);
  } catch (error) {
    throw error();
  }
}

const readingService = {
  getUserReadings,
  postReading,
  updateReview,
  updateGrade,
  updateReadingDate,
  deleteReading,
};

export default readingService;
