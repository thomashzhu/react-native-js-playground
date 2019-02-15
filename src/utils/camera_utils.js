import { ImagePicker, Permissions } from 'expo';

export const getImageUri = async (mediaType, allowsEditing) => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );

  if (!status) return null;

  const mediaMethod =
    mediaType === MediaType.Camera
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync;

  const result = await mediaMethod({
    allowsEditing,
  });

  if (result.cancelled) return null;

  const { uri } = result;
  return uri;
};
