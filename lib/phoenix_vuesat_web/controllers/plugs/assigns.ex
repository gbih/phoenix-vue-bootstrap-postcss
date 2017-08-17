defmodule Plugs.Assigns do
    import Plug.Conn

    # very nice way to create key-value data-structure
    # http://blog.lotech.org/a-phoenix-plug-for-assigning-template-variables.html

    def init(assigns), do: assigns

    def call(conn, assigns) do
        Enum.reduce assigns, conn, fn {k, v}, conn ->
            Plug.Conn.assign(conn, k, v)
        end
    end
end