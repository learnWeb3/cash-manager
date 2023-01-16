import { InputFilePhoto } from "../InputFilePhoto/index";
import { View } from "react-native";
import { Button } from "react-native-paper";

export function PhotoGalleryEditor({
  max = 3,
  photos = [
    {
      url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      uploaded: true, // flag to differentiate file already uploaded from file just captured using camera
    },
    {
      url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      uploaded: true,
    },
    {
      url: "https://images.pexels.com/photos/11987710/pexels-photo-11987710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      uploaded: true,
    },
  ],
  setPhotos = (updatedPhotos = []) => {},
}) {
  const handlePhotoURLChange = (url, index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1, {
      ...updatedPhotos[index],
      url,
      uploaded: false, // file is local must be uploaded then
    });
    setPhotos(updatedPhotos);
  };
  return (
    <View>
      {photos.map((photo, index) => (
        <InputFilePhoto
          key={index}
          photoURL={photo.url}
          onPhotoURLChange={(url) => handlePhotoURLChange(url, index)}
        />
      ))}

      {photos.length < max ? (
        <Button
          mode="contained"
          onPress={() => setPhotos([...photos, { url: "" }])}
          style={{
            marginBottom: 24,
          }}
        >
          Add picture
        </Button>
      ) : null}
    </View>
  );
}
