defmodule PhoenixVuesatWeb.PageController do
  use PhoenixVuesatWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
