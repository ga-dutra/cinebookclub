import watchingsRepository, {
  Watching,
} from "../repositories/watchings.repository";

async function getUserWatchings(user_id: number, medias_id: number) {
  try {
    const userWatchings = await watchingsRepository.listUserWatchings(
      user_id,
      medias_id
    );
    if (!userWatchings) {
      throw Error();
    }
    return userWatchings;
  } catch (error) {
    throw error();
  }
}

async function postWatching(data: Watching) {
  try {
    return await watchingsRepository.createWatching(data);
  } catch (error) {
    console.log(error);
    return;
  }
}

async function updateReview(
  newReview: string,
  user_id: number,
  api_id: string,
  medias_id: number
) {
  try {
    const userWatching = await watchingsRepository.findByMediaAndUserId(
      api_id,
      user_id,
      medias_id
    );

    return await watchingsRepository.updateReview(userWatching.id, newReview);
  } catch (error) {
    throw error();
  }
}

async function updateGrade(
  newGrade: number,
  user_id: number,
  api_id: string,
  medias_id: number
) {
  try {
    const userWatching = await watchingsRepository.findByMediaAndUserId(
      api_id,
      user_id,
      medias_id
    );

    return await watchingsRepository.updateGrade(userWatching.id, newGrade);
  } catch (error) {
    throw error();
  }
}

async function updateWatchingDate(
  newDate: Date,
  user_id: number,
  api_id: string,
  medias_id: number
) {
  try {
    const userWatching = await watchingsRepository.findByMediaAndUserId(
      api_id,
      user_id,
      medias_id
    );
    return await watchingsRepository.updateWatchingDate(
      userWatching.id,
      newDate
    );
  } catch (error) {
    throw error();
  }
}

async function deleteWatching(
  user_id: number,
  api_id: string,
  medias_id: number
) {
  try {
    const userWatching = await watchingsRepository.findByMediaAndUserId(
      api_id,
      user_id,
      medias_id
    );
    if (!userWatching) {
      throw Error();
    }
    return await watchingsRepository.deleteWatching(userWatching.id);
  } catch (error) {
    throw error();
  }
}

const watchingService = {
  getUserWatchings,
  postWatching,
  updateReview,
  updateWatchingDate,
  updateGrade,
  deleteWatching,
};

export default watchingService;
