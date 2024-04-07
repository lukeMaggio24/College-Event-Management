import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import MapsComponent from "./MapsComponent";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";

function EventCard({
  id,
  university,
  name,
  visibility,
  category,
  description,
  date,
  starttime,
  contactphone,
  contactemail,
  locationName,
  locationLongitude,
  locationLatitude,
}) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [editRating, setEditRating] = useState("");

  useEffect(() => {
    if (showComments) {
      // Fetch the comments for the event
      console.log(id);
      fetch(`http://localhost:3000/fetchcomments?id=${id}`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [showComments, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    // Send a POST request to add the comment
    fetch(`http://localhost:3000/addcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newComment,
        event_id: id,
        rating: newRating,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new comment to the comments array
        setComments((prevComments) => [
          ...prevComments,
          { ...data, rating: newRating, user_id: userId },
        ]);
        // Clear the input field
        setNewComment("");
        setNewRating("");
      });
  };

  const handleDelete = (commentId) => {
    fetch(`http://localhost:3000/deletecomment?id=${commentId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      });
  };

  const handleEdit = (comment) => {
    setEditComment(comment);
    setEditCommentText(comment.comment);
    setEditRating(comment.rating);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the comment
    fetch(`http://localhost:3000/editcomment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editComment.id,
        comment: editCommentText,
        rating: editRating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the user_id field to the updated comment
        data.user_id = editComment.user_id;

        // Update the comment in the comments array
        setComments(
          comments.map((comment) => (comment.id === data.id ? data : comment))
        );

        // Clear the input field and close the modal
        setNewComment("");
        setNewRating("");
        setShowEditModal(false);
      });
  };

  return (
    <Card style={{ width: "30rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          {name}, {university}
        </Card.Title>
        <Card.Subtitle>
          {visibility}, {category}
        </Card.Subtitle>
        <Card.Text style={{ marginTop: "0.4rem" }}>{description}</Card.Text>
        <Card.Text>
          Date: {date} @ {starttime} UTC
        </Card.Text>
        <Card.Text>Contact Phone: {contactphone}</Card.Text>
        <Card.Text>Contact Email: {contactemail}</Card.Text>
        <Card.Text>
          Location: {locationName} , {locationLongitude}, {locationLatitude}
        </Card.Text>
        {locationLongitude && locationLatitude && (
          <MapsComponent
            locationPickBool={false}
            longitude={locationLongitude}
            latitude={locationLatitude}
          />
        )}
        <Button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide comments" : "See comments"}
        </Button>
        {showComments && (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.comment}</td>
                    <td>{comment.rating}</td>

                    {comment.user_id == localStorage.getItem("user_id") && (
                      <>
                        <td>
                          <Button onClick={() => handleEdit(comment)}>
                            edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => handleDelete(comment.id)}>
                            delete
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Edit your comment"
                      value={editCommentText} // Changed from newComment
                      onChange={(e) => setEditCommentText(e.target.value)}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Edit your rating 1 - 5"
                      value={editRating} // Changed from newRating
                      onChange={(e) => setEditRating(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Add a rating 1 - 5"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
