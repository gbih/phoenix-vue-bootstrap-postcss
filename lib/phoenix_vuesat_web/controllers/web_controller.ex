defmodule PhoenixVuesatWeb.WebController do
  use PhoenixVuesatWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
