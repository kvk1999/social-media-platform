export const isSuperAdmin = async (req, res, next) => {
  const token = req.tokenData.roleName

  try {
    if (token !== "super_admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized. No superadmin priviledges" })
    }

    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "You don't have permissions",
    })
  }
}
