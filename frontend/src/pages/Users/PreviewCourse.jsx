import React from 'react'

const PreviewCourse = () => {
  return (
    <div>
      <video className="w-full h-48 rounded-lg" controls>
        <source src={video.url} type="video/mp4" />
      </video>
    </div>
  );
}

export default PreviewCourse
